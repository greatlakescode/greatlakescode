/**

echo "Hello, Alice!" > ./msg.txt

# Sign as Bob, so Alice knows who sent the message
openssl rsautl -sign -in ./msg.txt \
  -inkey ./bob/privkey.pem -out ./msg.sig

# Encrypt the message and the signature with Alice's key
openssl rsautl -encrypt -inkey alice/pubkey.pem \
  -pubin -in ./msg.txt -out ./msg.enc


 **/
