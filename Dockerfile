FROM codeception/codeceptjs
COPY . .
RUN yarn
CMD [ "yarn", "parallel" ]
