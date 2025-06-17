import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).default("Nova conversa"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  role: text("role").$type<"user" | "assistant">().notNull(), // ou enum no futuro
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  query: text("query").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const copyTemplates = pgTable("copy_templates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  prompt: text("prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations

// Relação do usuário com conversas, buscas e templates
export const userRelations = relations(users, ({ many }) => ({
  conversations: many(conversations),
  searches: many(searches),
  copyTemplates: many(copyTemplates),
}));

// Relação da conversa com o usuário e mensagens
export const conversationRelations = relations(
  conversations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [conversations.userId],
      references: [users.id],
    }),
    messages: many(messages),
  })
);

// Relação da mensagem com a conversa
export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

// Relação da busca com o usuário
export const searchRelations = relations(searches, ({ one }) => ({
  user: one(users, {
    fields: [searches.userId],
    references: [users.id],
  }),
}));

// Relação dos templates com o usuário
export const copyTemplateRelations = relations(copyTemplates, ({ one }) => ({
  user: one(users, {
    fields: [copyTemplates.userId],
    references: [users.id],
  }),
}));
