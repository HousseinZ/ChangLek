import {
  pgTable,
  text,
  varchar,
  integer,
  numeric,
  timestamp,
  uuid,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ============================================================
   Enums
   ============================================================ */

// User-level account roles. "kid" and "teacher" are kept for forward-compat
// but currently unused — every signup is a "parent" (family account holder).
export const userRoleEnum = pgEnum("user_role", ["kid", "parent", "teacher", "admin"]);

// Each row in `profiles` is either the parent's own avatar or a kid avatar.
export const profileTypeEnum = pgEnum("profile_type", ["parent", "kid"]);

export const exerciseTypeEnum = pgEnum("exercise_type", [
  "multiple_choice",
  "fill_in_blank",
  "matching_pairs",
  "picture_to_word",
  "reading_comprehension",
  "drag_and_drop",
  "sentence_building",
  "vocabulary_game",
  "listening",
  "speaking",
]);

/* ============================================================
   Family account (one auth login per family)
   ============================================================ */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ============================================================
   Profiles (Netflix-style avatars under one family account)
   - Parent profile is always created on signup (with a PIN).
   - Kid profiles are added by the parent. PIN is optional.
   ============================================================ */

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: profileTypeEnum("type").notNull(),
  name: varchar("name", { length: 255 }).notNull(),

  // Avatar = lucide icon name + hex color. Stored as strings so we can add
  // new presets without a schema migration.
  avatarIcon: varchar("avatar_icon", { length: 50 }).notNull(),
  avatarColor: varchar("avatar_color", { length: 20 }).notNull(),

  // bcrypt hash of a 4-digit numeric PIN. NULL = no PIN required.
  pinHash: text("pin_hash"),

  // Kid-only fields (NULL for parent profiles).
  age: integer("age"),
  gradeLevel: integer("grade_level"),
  totalXp: integer("total_xp").default(0).notNull(),
  currentLevel: integer("current_level").default(1).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ============================================================
   Curriculum & Skills
   ============================================================ */

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameTh: varchar("name_th", { length: 255 }).notNull(),
  parentSkillId: uuid("parent_skill_id"),
  curriculumStrand: varchar("curriculum_strand", { length: 100 }),
  gradeLevel: integer("grade_level"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skillMastery = pgTable("skill_mastery", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  skillId: uuid("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
  masteryScore: numeric("mastery_score", { precision: 3, scale: 2 }).default("0.00").notNull(),
  attempts: integer("attempts").default(0).notNull(),
  lastPracticedAt: timestamp("last_practiced_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ============================================================
   Content: Lessons & Exercises
   ============================================================ */

export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  skillIds: text("skill_ids").array(),
  createdBy: uuid("created_by").notNull().references(() => users.id, { onDelete: "restrict" }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  lessonId: uuid("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  type: exerciseTypeEnum("type").notNull(),
  contentJson: jsonb("content_json").notNull(),
  skillIds: text("skill_ids").array(),
  difficulty: integer("difficulty").default(1).notNull(),
  createdBy: uuid("created_by").notNull().references(() => users.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ============================================================
   Exercise Attempts & Progress
   ============================================================ */

export const exerciseAttempts = pgTable("exercise_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id, { onDelete: "restrict" }),
  isCorrect: boolean("is_correct").notNull(),
  timeTakenMs: integer("time_taken_ms"),
  attemptData: jsonb("attempt_data"),
  xpEarned: integer("xp_earned").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ============================================================
   Gamification: Badges & Streaks
   ============================================================ */

export const badges = pgTable("badges", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  color: varchar("color", { length: 20 }),
  criteriaJson: jsonb("criteria_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profileBadges = pgTable("profile_badges", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  badgeId: uuid("badge_id").notNull().references(() => badges.id, { onDelete: "restrict" }),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const streaks = pgTable("streaks", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").notNull().unique().references(() => profiles.id, { onDelete: "cascade" }),
  currentDays: integer("current_days").default(0).notNull(),
  longestDays: integer("longest_days").default(0).notNull(),
  lastActiveDate: timestamp("last_active_date"),
  streakFrozen: boolean("streak_frozen").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* ============================================================
   Relations (for Drizzle relational queries)
   ============================================================ */

export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
  lessonsCreated: many(lessons),
  exercisesCreated: many(exercises),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
  skillMastery: many(skillMastery),
  exerciseAttempts: many(exerciseAttempts),
  badges: many(profileBadges),
  streak: one(streaks, { fields: [profiles.id], references: [streaks.profileId] }),
}));

export const skillMasteryRelations = relations(skillMastery, ({ one }) => ({
  profile: one(profiles, { fields: [skillMastery.profileId], references: [profiles.id] }),
  skill: one(skills, { fields: [skillMastery.skillId], references: [skills.id] }),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  creator: one(users, { fields: [lessons.createdBy], references: [users.id] }),
  exercises: many(exercises),
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  lesson: one(lessons, { fields: [exercises.lessonId], references: [lessons.id] }),
  creator: one(users, { fields: [exercises.createdBy], references: [users.id] }),
  attempts: many(exerciseAttempts),
}));

export const exerciseAttemptsRelations = relations(exerciseAttempts, ({ one }) => ({
  profile: one(profiles, { fields: [exerciseAttempts.profileId], references: [profiles.id] }),
  exercise: one(exercises, { fields: [exerciseAttempts.exerciseId], references: [exercises.id] }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  profileBadges: many(profileBadges),
}));

export const profileBadgesRelations = relations(profileBadges, ({ one }) => ({
  profile: one(profiles, { fields: [profileBadges.profileId], references: [profiles.id] }),
  badge: one(badges, { fields: [profileBadges.badgeId], references: [badges.id] }),
}));

export const streaksRelations = relations(streaks, ({ one }) => ({
  profile: one(profiles, { fields: [streaks.profileId], references: [profiles.id] }),
}));
