FROM ubuntu:latest as builder

# Install necessary packages
RUN apt-get update && apt-get install -y \
  wget \
  && rm -rf /var/lib/apt/lists/*

# Download and install Go
RUN wget https://golang.org/dl/go1.17.5.linux-amd64.tar.gz && \
  tar -xvf go1.17.5.linux-amd64.tar.gz && \
  mv go /usr/local

ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /app

COPY . .

RUN go build main.go

FROM scratch

WORKDIR /app

COPY --from=builder /app .

CMD ["./main"]