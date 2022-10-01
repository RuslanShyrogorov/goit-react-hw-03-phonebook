import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import Form from './Form/Form';
import ContactsFilter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import { MainTitle, Title } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = newContact => {
    const { contacts } = this.state;
    const duplicateContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (duplicateContact)
      return window.alert(`${newContact.name} is already in contacts`);

    const contact = {
      id: nanoid(),
      ...newContact,
    };

    this.setState(({ contacts }) => {
      return {
        contacts: [contact, ...contacts],
      };
    });
  };

  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    console.log(contactId);
  };

  render() {
    const { filter } = this.state;
    const { changeFilter, filteredContacts, deleteContacts, addContact } = this;
    const visibleContact = filteredContacts();

    return (
      <Box
        width="30%"
        mt={3}
        mb={3}
        ml={6}
        p={4}
        bg="white"
        borderRadius="normal"
        boxShadow="card"
      >
        <MainTitle>Phonebook</MainTitle>
        <Form onSubmit={addContact} />
        <Title>Contacts</Title>
        <ContactsFilter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={deleteContacts}
        />
      </Box>
    );
  }
}
