const fs = require("node:fs");
const path = require("node:path");

const LOCK_ROOT_DIR = path.join(__dirname, ".locks");
const LOCK_DIR = path.join(LOCK_ROOT_DIR, "public-e2e");
const OWNER_FILE = path.join(LOCK_DIR, "owner.json");
const WAIT_INTERVAL_MS = 1000;
const ACQUIRE_TIMEOUT_MS = 15 * 60 * 1000;
const STALE_LOCK_MS = 30 * 60 * 1000;

let activeToken = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureLockRoot() {
  fs.mkdirSync(LOCK_ROOT_DIR, { recursive: true });
}

function now() {
  return Date.now();
}

function readOwner() {
  try {
    return JSON.parse(fs.readFileSync(OWNER_FILE, "utf8"));
  } catch {
    return null;
  }
}

function isLockStale(owner) {
  const acquiredAt = Number(owner?.acquiredAt || 0);
  return !Number.isFinite(acquiredAt) || acquiredAt <= 0 || now() - acquiredAt > STALE_LOCK_MS;
}

function tryRemoveStaleLock() {
  const owner = readOwner();
  if (!owner || !isLockStale(owner)) {
    return false;
  }

  try {
    fs.rmSync(LOCK_DIR, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
}

// Serializes public-environment E2E flows that mutate shared state.
async function acquirePublicE2ELock(label) {
  if (activeToken) {
    return;
  }

  ensureLockRoot();
  const startedAt = now();
  const owner = {
    label: String(label || "").trim() || "public-e2e",
    pid: process.pid,
    acquiredAt: 0,
    token: `${process.pid}-${startedAt}-${Math.random().toString(16).slice(2)}`,
  };

  while (true) {
    try {
      fs.mkdirSync(LOCK_DIR);
      owner.acquiredAt = now();
      fs.writeFileSync(OWNER_FILE, JSON.stringify(owner, null, 2), "utf8");
      activeToken = owner.token;
      return;
    } catch (error) {
      if (error && error.code !== "EEXIST") {
        throw error;
      }

      tryRemoveStaleLock();
      if (now() - startedAt > ACQUIRE_TIMEOUT_MS) {
        const activeOwner = readOwner();
        const activeLabel = String(activeOwner?.label || "").trim() || "unknown";
        throw new Error(`Timed out waiting for public E2E lock. Active owner: ${activeLabel}`);
      }

      await sleep(WAIT_INTERVAL_MS);
    }
  }
}

async function releasePublicE2ELock() {
  if (!activeToken) {
    return;
  }

  const owner = readOwner();
  if (owner?.token === activeToken) {
    try {
      fs.rmSync(LOCK_DIR, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors to avoid masking test results.
    }
  }

  activeToken = "";
}

module.exports = {
  acquirePublicE2ELock,
  releasePublicE2ELock,
};
