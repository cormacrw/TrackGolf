build:
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bootstrap src/main.go && zip deployment.zip bootstrap

deploy: build
	serverless deploy --stage prod

clean:
	rm -rf deployment.zip bootstrap ./vendor Gopkg.lock ./serverless
