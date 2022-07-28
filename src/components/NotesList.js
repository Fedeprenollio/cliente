import axios from "axios";
import React, { Component } from "react";
import Navigation from "./Navigation";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };
  getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    this.setState({ notes: res.data });
  };

  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    this.getNotes();
  };

  render() {
    return (
      <div>
        <Navigation />
        <div className="row">
          {this.state.notes.map((note) => (
            <div key={note._id} className="col-md-4 p-2">
              <div className="card">
                <div className="card-header d-flex justify-content-between ">
                  <h5>{note.title}</h5>
                  <Link to={`/edit/${note._id}`} className="btn btn-info">
                    Editar
                  </Link>
                </div>
                <div className="card-body">
                  <p> {note.content}</p>
                  <div className="d-flex">
                    <h6 className=" ml-auto"> Autor: {note.author}</h6>
                    <h6 className=" ml-auto"> {format(note.date)}</h6>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteNote(note._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
