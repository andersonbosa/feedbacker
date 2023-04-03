#!/bin/bash

SCRIPT_PATH=$(dirname $0)

echo -e '\n# GENERATING PRIVATE KEY'
openssl genrsa -out $SCRIPT_PATH/private.pem 4096

echo -e '\n# EXTATRACTING PUBLIC KEY FROM IT'
openssl rsa -in private.pem -pubout >$SCRIPT_PATH/public.pem

echo -e '\n# MOVING KEYS TO APPLICATION DIRECTORY'
mv $SCRIPT_PATH/{private,public}.pem $SCRIPT_PATH/../.
ls -l $SCRIPT_PATH/../{private,public}.pem
