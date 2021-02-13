const html = require('html-template-tag');
function landingPage() {
  return html`
    <html>
      <head>
        <title>Acme People, Places, Things</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <h1>Acme People, Places, Things!</h1>
        <div>
          <form method="POST" action="/">
            Person<input name="person" />
            <br />
            Place<input name="place" />
            <br />
            Thing<input name="thing" />
            <input type="submit" />
          </form>
        </div>
      </body>
    </html>
  `;
}

module.exports = landingPage;
