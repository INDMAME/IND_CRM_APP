import React from "react";
import ClientSearchCombobox from "../../../components/visitas/ClientSearchCombobox.tsx";
import ContactsCombobox from "../../../components/visitas/ContactsCombobox.tsx";

export type CreateSelectedClient = {
  value: string;
  text: string;
  cargo?: string;
  empresa?: string;
} | null;

export type CreateSelectedContact = {
  value: string;
  text: string;
  cargo: string;
  empresa: string;
};

type CreateStepClientSelectionProps = {
  selectedClient: CreateSelectedClient;
  selectedContacts: CreateSelectedContact[];
  onClientSelected: (nextClient: CreateSelectedClient) => void;
  onContactsChange: (nextContacts: CreateSelectedContact[]) => void;
  clientLabel: string;
  clientPlaceholder: string;
  selectedContactsCountText: string;
};

// Renders step 1 where user selects the account and related contacts.
const CreateStepClientSelection = ({
  selectedClient,
  selectedContacts,
  onClientSelected,
  onContactsChange,
  clientLabel,
  clientPlaceholder,
  selectedContactsCountText,
}: CreateStepClientSelectionProps) => {
  return (
    <div className="space-y-6">
      <ClientSearchCombobox
        value={selectedClient}
        onSelected={onClientSelected}
        label={clientLabel}
        placeholder={clientPlaceholder}
        portalClassName="visitas-typography"
      />

      <div className="space-y-3">
        <ContactsCombobox
          accountNum={selectedClient?.value}
          value={selectedContacts}
          onChange={onContactsChange}
          portalClassName="visitas-typography"
        />
        {selectedContacts.length > 0 && (
          <div className="text-xs text-slate-600">
            {selectedContactsCountText}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStepClientSelection;
