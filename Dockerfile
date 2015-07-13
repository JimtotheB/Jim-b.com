#Get baseimage up and running.

FROM phusion/baseimage:0.9.16

ENV JIMB_HOME /var/jimb

RUN apt-get update && apt-get -y install \
  build-essential \
  python \
  git \
  curl

RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo 'deb https://deb.nodesource.com/node012 trusty main' > /etc/apt/sources.list.d/nodesource.list && \
  echo 'deb-src https://deb.nodesource.com/node012 trusty main' >> /etc/apt/sources.list.d/nodesource.list

RUN apt-get update && apt-get install -y nodejs && node -v && npm -v
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# If you bind mount a volume from host/volume from a data container,
# ensure you use same uid

RUN useradd -d "$JIMB_HOME" -u 1000 -m -s /bin/bash jimb

ENV NODE_ENV production

RUN mkdir /etc/service/jimb-web
ADD jimb-web.sh /etc/service/jimb-web/run

EXPOSE 8080
ENV DockerCacheVersion 2
RUN npm install -g git+https://github.com/JimtotheB/Jim-b.com.git

CMD ["/sbin/my_init"]
