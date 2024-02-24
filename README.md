# NodeJS Service Template

This repository provides a template for creating a NodeJS service. It includes configurations for environment setup, scripts for development, installation, and other useful utilities.

## Installation and Initialization

To get started with this template, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using Git:

    ```bash
    git clone https://github.com/iMagicKey/nodejs-service-template.git
    ```

2. **Navigate to the Project Directory**: Move into the cloned directory:

    ```bash
    cd nodejs-service-template
    ```

3. **Install Dependencies**: Run the following command to install project dependencies:

    ```bash
    npm install
    ```

4. **Initialize the Service**: Execute the following command to initialize the service. This will set up the necessary configurations:

    ```bash
    npm run init
    ```

## Usage

After the installation and initialization, you can use the following scripts provided in the `package.json`:

- **Run in Development Mode**:

    ```bash
    npm run dev
    ```

- **Run in Live Mode**:

    ```bash
    npm run live
    ```

- **Install Service**:

    ```bash
    npm run install-service
    ```

- **Uninstall Service**:

    ```bash
    npm run uninstall-service
    ```

- **Create Certificates**:

    ```bash
    npm run create-certs live
    npm run create-certs dev
    ```



- **Clear Logs**:

    ```bash
    npm run clear-logs
    ```

## Configuration

- **Environment Variables**: This template uses environment variables for configuration. Modify `.env` file for environment-specific configurations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Created by DoubleFun.

Feel free to modify and adapt this template to suit your project needs! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
