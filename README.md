# TreNrod`s Blog

## System requirements

- Linux system (tested with Ubuntun 20.04 in WSL2)
- Python 3.8
- Docker
- node 12 with npm

## Setup

### Install tools and libs

 - Start planuml server as docker container
    - ```docker run -d -p 8080:8080 plantuml/plantuml-server:jetty```
 - Install required python libs in venv
    ```sh
    # Create virtual environment
    python3 -m venv .venv
    # Activate virual environment
    source ./venv/bin/activate
    # Install required python libs
    pip install -r requirements.txt
    ```
 - Install libs for frontend
    ```sh
    npm install
    ```

### Configuration
Following files need to be created and configured

 - deployment/inventory.yaml
   - This file should contain at least one server and all the information needed to connect to it
   ```yaml
      blogserver:
         hosts:
            sandbox:
                  ansible_host: [IP_ADDRESS_OF_THE_SERVER]
                  ansible_port: [SSH_PORT USUALLY 22]
                  ansible_user: [SSH USERNAME]
                  ansible_ssh_private_key_file: [PATH THE PRIVATE KEY OF THE SSH USER]
   ```
 - deployment/inventory.yaml
   ```yaml
   website_url: [WEBSITE_HOSTNAME]
   website_email: [YOUR EMAIL]
   ```

## Development

- Frontend development
   ```shell
   npm run start
   ```
- Create new blog entry
    ```shell
    python3 blogposttools/main.py create
    ```
   - This returns the newly created blogpost which can be editet and viewed in the browser during development

## Deployment
- Build meta data
   ```shell
   python3 blogposttool/main.py buil
   ```
- Build frontend and upload
   ```shell
   ansible-playbook deployment/playbooks/build_and_upload_blog.yaml -i deployment/inventory.yam
   ```
