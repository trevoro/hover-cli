// @format

const htmlStyle = `
html {
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  color: rgb(51, 51, 51);
}
body {
  margin: 0;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.content {
  display: block;
  text-align: center;
}
h1 {
  font-size: 2.488rem;
}
h3 {
  font-size: 1.728rem;
}
.btn {
  font-size: 1.2rem;
  background: blue;
  color: white;
  padding: 0.6rem 1.44rem;;
  border: 0 none;
  border-radius: 3px;
}
`;

const ok = `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hover - Auth OK</title>
  <style>${htmlStyle}</style>
</head>
<body>
  <div class="center">
    <div class="content">
      <h1>Hover</h1>
      <h3>Authentication Success</h3>
      <p>You can now close this tab</p>
    </div>
  </div>
</body>
</html>
`;

const test = `
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hover - Auth Request</title>
  <style>${htmlStyle}</style>
</head>
<body>
  <div class="center">
    <div class="content">
      <h1>Hover</h1>
      <h3>Authentication Request</h3>
      <p>The hover CLI is requesting full API access to your account</p>
      <a href="__REDIRECT_URI__"><button class="btn">Grant Access</button></a>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  ok,
  test,
};
