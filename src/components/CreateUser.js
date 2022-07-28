import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
  };

  async componentDidMount() {
    this.getUsers();
  }

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
    });
    this.setState({ username: "" });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };

  render() {
    return (
      <div>
        <Navigation />
        <div className="row container p-4">
          <div className="col-md-4">
            <div className="card card-body">
              <h3>Crear nuevo usuario</h3>
              <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUserName}
                  value={this.state.username}
                  placeholder="Nuevo usuario"
                />
                <button type="submit" className="btn btn-primary">
                  Crear usuario
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <ul className="list-group">
              {this.state.users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item list-group-item-action"
                >
                  {user.username}
                  <button
                    onClick={() => this.deleteUser(user._id)}
                    className="btn btn-danger d-flex ml-auto"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
