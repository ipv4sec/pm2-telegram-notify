#!/usr/bin/env bash

cat doc/v1/header.md \
doc/v1/base.md \
doc/v1/crop.md \
doc/v1/farm.md \
doc/v1/land.md \
doc/v1/policy.md \
  > doc/v1.md

aglio --theme-full-width -t peperoncino -i doc/v1.md -o doc/v1.html