<script>
    import { onMount } from "svelte";
    import {browser} from '$app/environment'
    let username,
      password,
      logon,
      account = true,
      message = "";
    import { userData } from "../firebase/user-management";
    import { signin } from "../firebase/user-management";
    import { register } from "../firebase/user-management";
    async function login() {
      message = "";
      if (username == "") return;
        logon = await signin(username, password);
      if (logon.status > 299) {
        localStorage.clear();
        return (message = "Invalid Credentials");
      }
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      userData.set(logon.data.data);
    }
    async function create() {
      message = "";
      if (username.length < 4) return (message = "Username must be at least 4 letters.");
      if (password.length < 6) return (message = "Password must be at least 6 letters.");
      logon = await register(username, password);
      if(logon.data){
        await login()
      }else{
        message = logon
      }
    }
    async function autolog() {
      if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        password = localStorage.getItem("password");
        await login();
      }
    }
    onMount(()=>{
    autolog();
    })
  </script>
  {#if browser}
  {#if !localStorage.getItem("username")}
    <div class="register-form">
      <div class="form">
        {#if account}
          <div class="form-heading">
            <h2>Sign in</h2>
          </div>
          <form
            class="login-page"
            on:submit={function (submit) {
              submit.preventDefault();
              login();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              bind:value={username}
              required
            />
            <input
              type="password"
              placeholder="password"
              bind:value={password}
              required
            />
            <p>{message}</p>
            <button type="submit">Log in</button>
          </form>
          <button
            on:click={function () {
              account = false;
              message = ''
            }}
            >
            Create an account
          </button>
        {:else}
          <div class="form-heading">
            <h2>Register</h2>
          </div>
          <form
            class="login-page"
            on:submit={function (submit) {
              submit.preventDefault();
              create();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              bind:value={username}
            />
            <input
              type="password"
              placeholder="password"
              bind:value={password}
              required
            />
            <p>{message}</p>
            <button type="submit">Create</button>
          </form>
          <button
            on:click={function () {
              account = true;
              message = ''
            }}
          >
        Sign in
          </button>
        {/if}
      </div>
    </div>
  {:else}
    <p>loading...</p>
  {/if}
  {/if}
  <style>
    .register-form {
      height: 500px;
      width: 400px;
      margin: auto;
      font-family: sans-serif;
      border-radius: 3px;
      overflow: hidden;
      margin-top: calc(75vh - 450px);
      border-radius: 25px;
      border: solid 1px black;
    }
    .form {
      width: 90%;
      margin: auto;
      position: relative;
      z-index: 1;
      background: #fff;
      text-align: center;
    }
    .form .form-heading {
      font: 400 1.2em sans-serif;
      color: #16a085;
      padding: 25px;
    }
    .form .form-heading h2 {
      text-transform: uppercase;
    }
    .form input {
      width: 90%;
      background: #f2f2f2;
      color: #16a085;
      border: 0;
      margin: 0 0 15px;
      padding: 15px;
      font-size: 14px;
      outline: 0;
    }
    .form button {
      width: 100%;
      color: #fff;
      background: #16a085;
      text-transform: uppercase;
      border: 0;
      padding: 15px;
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      outline: 0;
    }
    .form button:hover,
    .form button:focus {
      background: #11826b;
    }
    button {
      background-color: blue;
    }
  </style>