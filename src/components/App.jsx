import React, { Component } from 'react';
import css from './phonebook.module.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm.jsx';
import ContactList from './ContactList.jsx';
import Filter from './Filter.jsx';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = contact => {
    const { name, number } = contact;

    // Sprawdzanie, czy nazwa nowego kontaktu nie jest pusta - zabezpiecza przed dodaniem pustego pola
    if (name.trim() === '') return;


    //Metoda some() sprawdza, czy co najmniej jeden element tablicy spełnia warunek opisany przez callback (metoda zwroci 'true' lub 'false')
    const isExistingContact = this.state.contacts.some( existingContact => existingContact.name.toLowerCase() === name.toLowerCase());

    if (isExistingContact) {
      alert(`Contact '${name}' already exists in the phonebook!`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState({
      //stan aplikacji jest aktualizowany poprzez dodanie nowego kontaktu do listy kontaktów za pomocą spread operatora
      contacts: [...this.state.contacts, newContact],
      //wartość nazwy jest resetowana do pustego ciągu, aby wyczyścić pole wejściowe
      name: '',
      number: '',
    });
  };


  //Za pomocą metody 'filter' na tablicy prevState.contacts, usuwamy z tablicy ten kontakt, którego 'id' odpowiada 'id' przekazanemu do metody 'handleDeleteContact'. Metoda 'filter' tworzy nową tablicę zawierającą tylko te elementy, które spełniają warunek podany w funkcji zwrotnej. W tym przypadku, usuwamy kontakt o 'id' równym 'id', które chcemy usunąć.
  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value.toLowerCase(),
    });
  };
 

    //.includes(filter) sprawdza, czy nazwa kontaktu zawiera podany ciąg znaków, który jest przechowywany w stanie jako filter. Jeśli tak, zwraca true, co oznacza, że kontakt zostanie zachowany
 filteredContacts = () => {
  const {contacts, filter } = this.state;
  return contacts.filter(contact =>
  contact.name.toLowerCase().includes(filter)
)};
 

  render() {
    return (
      <div className="App">
        <div className={css['container']}>
          <h1>Phonebook</h1>
          <ContactForm
            contacts={this.state.contacts}
            handleSubmit={this.handleSubmit}
          />
          <h2>Contacts</h2>
          <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
          <ContactList contacts={this.filteredContacts()} onDeleteContact={this.handleDeleteContact}/>
        </div>
      </div>
    );
  }
}
