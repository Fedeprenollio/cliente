import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import DatePicket from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export class CreateNote extends React.Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    editing: false,
    id: "",
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data,
      userSelected: res.data[0]?.username,
    });
  };
  async componentDidMount() {
    await this.getUsers();

    if (this.props.match.params.id) {
      const oneNote = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      console.log("la nota", oneNote);
      this.setState({
        title: oneNote.data.title,
        content: oneNote.data.content,
        userSelected: oneNote.data.author,
        date: new Date(oneNote.data.date),
        //------//
        editing: true,
        id: this.props.match.params.id,
      });
      console.log("la state", this.state.title);

    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected,
      date: this.state.date,
    };

    if (this.state.editing) {
      console.log(newNote);
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state.id,
        newNote
      );
    } else {
      if (!newNote.author) {
        window.alert("Sin autor en base de datos");
        return;
      } else {
        await axios.post("http://localhost:4000/api/notes", newNote);
      }
    }
    window.location.href = "/";
  };

  onInputChange = async (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };
  render() {
    return (
      <div>
        <Navigation />
        <div className="col-md-6 offset-md-3">
          <div className="card card-body">
            <h4>Crea una nota</h4>
            <form onSubmit={this.onSubmit}>
              {/** SELECT USER - En proxima version hare un login */}

              <div className="form-group">
                <select
                  className="form-control"
                  name="userSelected"
                  onChange={(e) => this.onInputChange(e)}
                  id=""
                  value={this.state.userSelected}
                >
                  {this.state.users.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <input
                  onChange={(e) => this.onInputChange(e)}
                  type="text"
                  className="form-control"
                  placeholder="Titulo"
                  name="title"
                  value={this.state.title}

                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={(e) => this.onInputChange(e)}
                  type="text"
                  className="form-control"
                  placeholder="Contenido"
                  name="content"
                  value={this.state.content}

                  required
                />
              </div>

              <div className="form-group">
                <DatePicket
                  onChange={this.onChangeDate}
                  className="form-control"
                  selected={this.state.date}
                   

                />
              </div>
              <button className="btn btn-secondary" type="submit">
                Crear nota
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateNote);
