const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.event.deleteMany()
  await prisma.organizer.deleteMany()

  // Organizers
  const comedyOrg = await prisma.organizer.create({
    data: {
      name: 'Laugh Club Collective',
      isTrusted: true
    }
  })

  const musicOrg = await prisma.organizer.create({
    data: {
      name: 'Indie Music Chennai',
      isTrusted: false
    }
  })

  const workshopOrg = await prisma.organizer.create({
    data: {
      name: 'Creative Hands Studio',
      isTrusted: true
    }
  })

  await prisma.event.createMany({
    data: [
      {
        title: 'Stand-up Comedy Night',
        description:
          'An intimate stand-up comedy show featuring upcoming comics.',
        category: 'Comedy',
        date: new Date('2026-02-01'),
        startTime: '7:30 PM',
        endTime: '9:00 PM',
        price: 399,
        venue: 'Indiranagar Social',
        city: 'Chennai',
        organizerId: comedyOrg.id,
        isHiddenGem: true

      },
      {
        title: 'Open Mic Comedy Evening',
        description:
          'A relaxed open mic night with new and experienced comedians.',
        category: 'Comedy',
        date: new Date('2026-02-02'),
        startTime: '8:00 PM',
        endTime: '10:00 PM',
        price: 299,
        venue: 'Dialogue Cafe',
        city: 'Chennai',
        organizerId: comedyOrg.id
      },
      {
        title: 'Live Indie Music Gig',
        description:
          'Live performances by independent artists and bands.',
        category: 'Music',
        date: new Date('2026-02-03'),
        startTime: '8:00 PM',
        endTime: '10:30 PM',
        price: 499,
        venue: 'Hard Rock Cafe',
        city: 'Chennai',
        organizerId: musicOrg.id
      },
      {
        title: 'Watercolor Workshop for Beginners',
        description:
          'Learn the basics of watercolor painting in a hands-on workshop.',
        category: 'Workshops',
        date: new Date('2026-02-04'),
        startTime: '11:00 AM',
        endTime: '2:00 PM',
        price: 350,
        venue: 'Art House Studio',
        city: 'Chennai',
        organizerId: workshopOrg.id
      },
      {
        title: 'Pottery Workshop for Beginners',
        description:
          'Hands-on pottery workshop focused on fundamentals.',
        category: 'Workshops',
        date: new Date('2026-02-05'),
        startTime: '10:00 AM',
        endTime: '1:00 PM',
        price: 450,
        venue: 'Clay Station',
        city: 'Chennai',
        organizerId: workshopOrg.id,
        isHiddenGem: true
      }
    ]
  })
}

main()
  .then(() => {
    console.log('Seed data inserted successfully')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
