import fetch from "node-fetch";

export const slash = async (req, res) => {
  const response = "";
  res.render("index.ejs", { response });
};

export const renderlogin = async (req, res) => {
  res.render("Login.ejs");
};

export const renderHome = async (req, res) => {
  res.render("index.ejs");
};

export const login = async (req, res) => {
  try {
    const response = await fetch("http://192.168.137.1:5000/api/login", {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.status)
    if(response.status== 200)
    res.render("Login.ejs");
  else
  res.render('index.ejs')
  } catch (error) {
    res.send(error)
  }
};

export const register = async (req, res) => {
  try {
    const response = await fetch("http://192.168.137.1:5000/api/register", {
      method: "post",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.status)
    if(response.status== 200)
    res.render("Login.ejs");
  else
  res.render('index.ejs')
  } catch (error) {
    res.send(error)
  }
};
