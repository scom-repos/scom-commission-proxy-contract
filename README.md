## Step 1: Install packages
Create a new directory named `repos`, go into it and run the following command:
```
git clone https://github.com/scom-repos/product-master-contract.git
```
Go back to the root directory and run the following command:
```sh
docker-compose up install
```
## Step 2: Build library and run test
```sh
docker-compose up build
```

```sh
docker-compose up test
```