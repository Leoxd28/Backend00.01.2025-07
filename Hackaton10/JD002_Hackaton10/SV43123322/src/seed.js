require('dotenv').config();
const { User, Course, Lesson, Enrollment, Comment, sequelize } = require('./models');

console.log('🌱 [seed] Starting database seeding...');

const seedDatabase = async () => {
    try {
        // Sync database first
        await sequelize.sync({ force: false });
        console.log('✅ [seed] Database synced');

        // Create Users
        console.log('👥 [seed] Creating users...');
        const users = await User.bulkCreate([
            {
                firstName: 'Ada',
                lastName: 'Lovelace',
                email: 'ada@dev.io',
                passwordHash: 'password123',
                role: 'instructor'
            },
            {
                firstName: 'Linus',
                lastName: 'Torvalds',
                email: 'linus@dev.io',
                passwordHash: 'password123',
                role: 'student'
            },
            {
                firstName: 'Grace',
                lastName: 'Hopper',
                email: 'grace@dev.io',
                passwordHash: 'password123',
                role: 'instructor'
            },
            {
                firstName: 'Alan',
                lastName: 'Turing',
                email: 'alan@dev.io',
                passwordHash: 'password123',
                role: 'student'
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'admin@dev.io',
                passwordHash: 'admin123',
                role: 'admin'
            }
        ], { 
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`✅ [seed] Created ${users.length} users`);

        // Get users for references
        const ada = await User.findByEmail('ada@dev.io');
        const grace = await User.findByEmail('grace@dev.io');
        const linus = await User.findByEmail('linus@dev.io');
        const alan = await User.findByEmail('alan@dev.io');

        // Create Courses
        console.log('📚 [seed] Creating courses...');
        const courses = await Course.bulkCreate([
            {
                title: 'Introduction to Node.js',
                slug: 'intro-nodejs',
                description: 'Learn the basics of Node.js development from scratch',
                published: true,
                ownerId: ada.id
            },
            {
                title: 'Advanced JavaScript Patterns',
                slug: 'advanced-js-patterns',
                description: 'Master advanced JavaScript concepts and design patterns',
                published: true,
                ownerId: grace.id
            },
            {
                title: 'Database Design with MySQL',
                slug: 'database-design-mysql',
                description: 'Complete guide to MySQL database design and optimization',
                published: false,
                ownerId: ada.id
            },
            {
                title: 'React.js Fundamentals',
                slug: 'react-fundamentals',
                description: 'Build modern web applications with React.js',
                published: true,
                ownerId: grace.id
            }
        ], { 
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`✅ [seed] Created ${courses.length} courses`);

        // Get courses for references
        const nodeJsCourse = await Course.findOne({ where: { slug: 'intro-nodejs' } });
        const jsCourse = await Course.findOne({ where: { slug: 'advanced-js-patterns' } });
        const dbCourse = await Course.findOne({ where: { slug: 'database-design-mysql' } });
        const reactCourse = await Course.findOne({ where: { slug: 'react-fundamentals' } });

        // Create Lessons
        console.log('📝 [seed] Creating lessons...');
        const lessons = await Lesson.bulkCreate([
            // Node.js Course Lessons
            {
                title: 'Setting up Node.js Environment',
                slug: 'setup-nodejs-environment',
                body: 'In this lesson, you will learn how to set up your Node.js development environment. We will cover installation of Node.js, npm package manager, and setting up your first project. This foundational knowledge is essential for any Node.js developer.',
                order: 1,
                courseId: nodeJsCourse.id
            },
            {
                title: 'Understanding NPM and Package.json',
                slug: 'understanding-npm-package-json',
                body: 'Package management is crucial in Node.js development. This lesson covers npm commands, package.json structure, dependency management, and best practices for managing project dependencies. You will also learn about semantic versioning and security considerations.',
                order: 2,
                courseId: nodeJsCourse.id
            },
            {
                title: 'Building Your First HTTP Server',
                slug: 'building-first-http-server',
                body: 'Learn to create HTTP servers using Node.js built-in modules. We will explore the http module, request/response objects, routing basics, and handling different HTTP methods. This lesson provides the foundation for web development with Node.js.',
                order: 3,
                courseId: nodeJsCourse.id
            },
            // JavaScript Patterns Course Lessons
            {
                title: 'Module Patterns and ES6 Modules',
                slug: 'module-patterns-es6',
                body: 'Modern JavaScript applications require proper code organization. This lesson covers various module patterns including CommonJS, AMD, and ES6 modules. Learn how to structure your code for maintainability and reusability across different environments.',
                order: 1,
                courseId: jsCourse.id
            },
            {
                title: 'Async Patterns: Promises and Async/Await',
                slug: 'async-patterns-promises-await',
                body: 'Asynchronous programming is essential in JavaScript. Master promises, async/await syntax, error handling in asynchronous code, and common async patterns. This lesson includes practical examples and best practices for handling asynchronous operations.',
                order: 2,
                courseId: jsCourse.id
            },
            // React Course Lessons
            {
                title: 'React Components and JSX',
                slug: 'react-components-jsx',
                body: 'Understanding React components is fundamental to React development. Learn about functional and class components, JSX syntax, component composition, and best practices for building reusable UI components.',
                order: 1,
                courseId: reactCourse.id
            },
            {
                title: 'State Management with Hooks',
                slug: 'state-management-hooks',
                body: 'React hooks revolutionized state management in functional components. This lesson covers useState, useEffect, custom hooks, and patterns for managing complex application state. Learn when and how to use different hooks effectively.',
                order: 2,
                courseId: reactCourse.id
            }
        ], { 
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`✅ [seed] Created ${lessons.length} lessons`);

        // Create Enrollments
        console.log('🎓 [seed] Creating enrollments...');
        const enrollments = await Enrollment.bulkCreate([
            {
                userId: linus.id,
                courseId: nodeJsCourse.id,
                status: 'active',
                score: 85.5
            },
            {
                userId: alan.id,
                courseId: nodeJsCourse.id,
                status: 'active',
                score: 92.0
            },
            {
                userId: linus.id,
                courseId: jsCourse.id,
                status: 'pending'
            },
            {
                userId: alan.id,
                courseId: reactCourse.id,
                status: 'active',
                score: 78.5
            }
        ], { 
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`✅ [seed] Created ${enrollments.length} enrollments`);

        // Update course students count
        await nodeJsCourse.update({ studentsCount: 2 });
        await jsCourse.update({ studentsCount: 1 });
        await reactCourse.update({ studentsCount: 1 });

        // Get lessons for comments
        const setupLesson = await Lesson.findOne({ where: { slug: 'setup-nodejs-environment' } });
        const npmLesson = await Lesson.findOne({ where: { slug: 'understanding-npm-package-json' } });
        const moduleLesson = await Lesson.findOne({ where: { slug: 'module-patterns-es6' } });

        // Create Comments
        console.log('💬 [seed] Creating comments...');
        const comments = await Comment.bulkCreate([
            {
                body: 'Great introduction! The step-by-step setup process was very clear.',
                userId: linus.id,
                lessonId: setupLesson.id
            },
            {
                body: 'I had some issues with Windows installation, but the troubleshooting section helped.',
                userId: alan.id,
                lessonId: setupLesson.id
            },
            {
                body: 'Very comprehensive coverage of npm. The package.json explanation was particularly helpful.',
                userId: linus.id,
                lessonId: npmLesson.id
            },
            {
                body: 'The semantic versioning section cleared up a lot of confusion for me. Thanks!',
                userId: alan.id,
                lessonId: npmLesson.id
            },
            {
                body: 'ES6 modules are so much cleaner than the old patterns. Great comparison in this lesson.',
                userId: linus.id,
                lessonId: moduleLesson.id
            }
        ], { 
            ignoreDuplicates: true,
            returning: true
        });
        console.log(`✅ [seed] Created ${comments.length} comments`);

        console.log('');
        console.log('🎉 [seed] Database seeding completed successfully!');
        console.log('📊 [seed] Summary:');
        console.log(`   👥 Users: ${users.length}`);
        console.log(`   📚 Courses: ${courses.length}`);
        console.log(`   📝 Lessons: ${lessons.length}`);
        console.log(`   🎓 Enrollments: ${enrollments.length}`);
        console.log(`   💬 Comments: ${comments.length}`);
        console.log('');

        // Display test data
        console.log('🔍 [seed] Test data created:');
        console.log('👥 Test Users:');
        console.log('   - ada@dev.io (instructor) - password: password123');
        console.log('   - grace@dev.io (instructor) - password: password123');
        console.log('   - linus@dev.io (student) - password: password123');
        console.log('   - alan@dev.io (student) - password: password123');
        console.log('   - admin@dev.io (admin) - password: admin123');
        console.log('');
        console.log('📚 Sample Courses:');
        console.log('   - Introduction to Node.js (published)');
        console.log('   - Advanced JavaScript Patterns (published)');
        console.log('   - React.js Fundamentals (published)');
        console.log('   - Database Design with MySQL (draft)');
        console.log('');

    } catch (error) {
        console.error('❌ [seed] Error seeding database:', error);
        throw error;
    }
};

// Run seeding if called directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('✅ [seed] Seeding completed, exiting...');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ [seed] Seeding failed:', error);
            process.exit(1);
        });
}

module.exports = { seedDatabase };