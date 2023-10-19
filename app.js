const fs = require('fs');

const readmeText = `
# Repo Read Me

This repository contains the code for a project. 

## Description

This project is a web application that utilizes Express.js and Socket.IO to facilitate real-time communication between clients and the server.

## Installation

To install the necessary dependencies, run the following command:

\`\`\`
npm install
\`\`\`

## Usage

To start the server, run the following command:

\`\`\`
node app.js
\`\`\`

Once the server is running, you can access the application by navigating to \`http://localhost:3000\` in your web browser.

## Contributing

If you would like to contribute to this project, please follow the guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
`;

fs.writeFile('README.md', readmeText, (err) => {
  if (err) throw err;
  console.log('Read Me file created successfully!');
});