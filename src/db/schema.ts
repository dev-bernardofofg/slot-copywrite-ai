import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Tabela de usuários (compatível com Better Auth)
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Tabela de contas (necessária para autenticação social)
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Tabela de sessões (necessária para autenticação)
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Tabela de verificação (necessária para autenticação)
export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// Tabela de conversas
export const conversations = pgTable("conversations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).default("Nova conversa"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabela de mensagens
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  role: text("role").$type<"user" | "assistant">().notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabela de buscas
export const searches = pgTable("searches", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  query: text("query").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabela de templates de cópia
export const copyTemplates = pgTable("copy_templates", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  prompt: text("prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relações

// Relações do usuário
export const userRelations = relations(users, ({ many, one }) => ({
  conversations: many(conversations),
  searches: many(searches),
  copyTemplates: many(copyTemplates),
  verifications: one(verifications),
  accounts: one(accounts),
  sessions: one(sessions),
}));

// Relações das contas
export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Relações das sessões
export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Relações das verificações
export const verificationRelations = relations(verifications, ({ one }) => ({
  user: one(users, {
    fields: [verifications.id],
    references: [users.id],
  }),
}));

// Relações das conversas
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

// Relações das mensagens
export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

// Relações das buscas
export const searchRelations = relations(searches, ({ one }) => ({
  user: one(users, {
    fields: [searches.userId],
    references: [users.id],
  }),
}));

// Relações dos templates
export const copyTemplateRelations = relations(copyTemplates, ({ one }) => ({
  user: one(users, {
    fields: [copyTemplates.userId],
    references: [users.id],
  }),
}));
