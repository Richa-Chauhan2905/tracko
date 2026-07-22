import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  doublePrecision,
  real,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const tripStatusEnum = pgEnum("trip_status", [
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    googleId: varchar("google_id", { length: 255 }).notNull(),

    email: varchar("email", { length: 255 }).notNull(),

    name: varchar("name", { length: 255 }).notNull(),

    profilePicture: varchar("profile_picture", { length: 500 }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    googleIdIdx: uniqueIndex("users_google_id_idx").on(table.googleId),
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  }),
);

export const trips = pgTable(
  "trips",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    startedAt: timestamp("started_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    endedAt: timestamp("ended_at", {
      withTimezone: true,
    }),

    status: tripStatusEnum("status").default("ACTIVE").notNull(),
  },
  (table) => ({
    userIdx: index("trips_user_idx").on(table.userId),
  }),
);

export const locations = pgTable(
  "locations",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    tripId: uuid("trip_id")
      .notNull()
      .references(() => trips.id, {
        onDelete: "cascade",
      }),

    latitude: doublePrecision("latitude").notNull(),

    longitude: doublePrecision("longitude").notNull(),

    speed: real("speed"),

    heading: real("heading"),

    accuracy: real("accuracy"),

    recordedAt: timestamp("recorded_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    tripIdx: index("locations_trip_idx").on(table.tripId),
    timestampIdx: index("locations_timestamp_idx").on(table.recordedAt),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),

  locations: many(locations),
}));

export const locationsRelations = relations(locations, ({ one }) => ({
  trip: one(trips, {
    fields: [locations.tripId],
    references: [trips.id],
  }),
}));
