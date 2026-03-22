import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const alice = await createUser("alice", "password123");
  const bob = await createUser("bob", "password123");

  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  const alicePlaylist = await createPlaylist(
    "Alice Mix",
    "Alice favorites",
    alice.id,
  );
  const bobPlaylist = await createPlaylist("Bob Mix", "Bob favorites", bob.id);

  for (let i = 1; i <= 5; i++) {
    await createPlaylistTrack(alicePlaylist.id, i);
  }

  for (let i = 6; i <= 10; i++) {
    await createPlaylistTrack(bobPlaylist.id, i);
  }
}