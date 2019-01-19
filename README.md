# AES block encryption demo

The purpose of this repo is to discover the inner workings of AES block encryption. It is not to be used for anything other than educational purposes. It is terrible inefficient and only supports a very narrow use-case.

## Usage
```
git clone git@github.com:felin-arch/aes-demo.git
cd aes-demo
npm i
npm t
```

You may also run the tests with `DEBUG=1 npm t`, this will print each step of the encryption process.

I used the [AES whitepaper](https://nvlpubs.nist.gov/nistpubs/fips/nist.fips.197.pdf) for implementing


