## Migration

```bash
# auto generate migration file if we update entity files
$ npm run typeorm:migrate --name=name-of-file

# create a migration file if we manully write sql script in the file
$ npm run typeorm:create --name=name-of-file

# run migration
$ npm run typeorm:migrate

# run revert
$ npm run typeorm:revert
```