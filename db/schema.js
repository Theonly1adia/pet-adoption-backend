import { mysqlTable, int, varchar, decimal, tinyint, timestamp } from 'drizzle-orm/mysql-core';

export const usersSchema = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    created_at: timestamp('created_at'),
    email: varchar('email', {length: 255}),
    password: varchar('password', {length: 255})
})

export const petsSchema = mysqlTable('pets', {
    id: int('id').primaryKey().autoincrement(),
    user_id: int('user_id', {length: 255}),
    name: varchar('name', {length: 255}),
    species: varchar('species', {length: 255}),
    age: int('age'),
    description: text('description'),
    image_url: varchar('image_uel', {length: 500}),
    created_at: timestamp('created_at'),
})