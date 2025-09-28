/*// src/models.js (ejemplo de centralización)
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName:  { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin','author','reader'), defaultValue: 'reader' }
}, { tableName: 'users' });

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING, allowNull: false },
  slug:  { type: DataTypes.STRING, allowNull: false, unique: true },
  body:  { type: DataTypes.TEXT, allowNull: false },
  published: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'posts', paranoid: true });

const Comment = sequelize.define('Comment', {
  body: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'comments' });

// Asociaciones
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = { sequelize, User, Post, Comment };*/
















const { DataTypes, Op } = require('sequelize');
const sequelize = require('./db');

console.log('📋 [models] Defining database models...');

// User model con validaciones completas
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'User unique identifier'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: {
                args: [2, 100],
                msg: 'Name must be between 2 and 100 characters'
            },
            notEmpty: {
                msg: 'Name cannot be empty'
            },
            is: {
                args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/i,
                msg: 'Name can only contain letters and spaces'
            }
        },
        comment: 'User full name'
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
            name: 'unique_email',
            msg: 'Email address already exists'
        },
        validate: {
            isEmail: {
                msg: 'Must be a valid email address'
            },
            len: {
                args: [5, 255],
                msg: 'Email must be between 5 and 255 characters'
            },
            notEmpty: {
                msg: 'Email cannot be empty'
            }
        },
        comment: 'User email address'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [6, 255],
                msg: 'Password must be at least 6 characters'
            },
            notEmpty: {
                msg: 'Password cannot be empty'
            }
        },
        comment: 'User password (should be encrypted)'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active',
        validate: {
            isIn: {
                args: [['active', 'inactive', 'suspended']],
                msg: 'Status must be active, inactive, or suspended'
            }
        },
        comment: 'User account status'
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Last login timestamp'
    },
    emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Email verification timestamp'
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: false,
    comment: 'Users table for blog application',
    indexes: [
        {
            unique: true,
            fields: ['email'],
            name: 'idx_users_email_unique'
        },
        {
            fields: ['status'],
            name: 'idx_users_status'
        },
        {
            fields: ['created_at'],
            name: 'idx_users_created_at'
        }
    ]
});

// Post model con validaciones completas
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Post unique identifier'
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [5, 255],
                msg: 'Title must be between 5 and 255 characters'
            },
            notEmpty: {
                msg: 'Title cannot be empty'
            }
        },
        comment: 'Post title'
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: {
            name: 'unique_slug',
            msg: 'Slug must be unique'
        },
        validate: {
            len: {
                args: [5, 255],
                msg: 'Slug must be between 5 and 255 characters'
            },
            is: {
                args: /^[a-z0-9-]+$/i,
                msg: 'Slug can only contain letters, numbers, and hyphens'
            }
        },
        comment: 'URL-friendly version of title'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [10, 50000],
                msg: 'Content must be between 10 and 50000 characters'
            },
            notEmpty: {
                msg: 'Content cannot be empty'
            }
        },
        comment: 'Post content in HTML/Markdown'
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: {
                args: [0, 500],
                msg: 'Excerpt cannot exceed 500 characters'
            }
        },
        comment: 'Short description of the post'
    },
    status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
        validate: {
            isIn: {
                args: [['draft', 'published', 'archived']],
                msg: 'Status must be draft, published, or archived'
            }
        },
        comment: 'Post publication status'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        validate: {
            isInt: {
                msg: 'User ID must be an integer'
            },
            min: {
                args: 1,
                msg: 'User ID must be greater than 0'
            }
        },
        comment: 'ID of the user who created this post'
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date when post was published'
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: {
                args: 0,
                msg: 'View count cannot be negative'
            },
            isInt: {
                msg: 'View count must be an integer'
            }
        },
        comment: 'Number of views for this post'
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Whether this post is featured'
    }
}, {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
    paranoid: false,
    comment: 'Posts table for blog application',
    indexes: [
        {
            fields: ['userId'],
            name: 'idx_posts_user_id'
        },
        {
            fields: ['status'],
            name: 'idx_posts_status'
        },
        {
            unique: true,
            fields: ['slug'],
            name: 'idx_posts_slug_unique',
            where: {
                slug: {
                    [Op.ne]: null
                }
            }
        },
        {
            fields: ['publishedAt'],
            name: 'idx_posts_published_at'
        },
        {
            fields: ['featured'],
            name: 'idx_posts_featured'
        },
        {
            fields: ['created_at'],
            name: 'idx_posts_created_at'
        }
    ]
});

// Define associations
console.log('🔗 [models] Setting up model associations...');

// User has many Posts
User.hasMany(Post, { 
    foreignKey: 'userId', 
    as: 'posts',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Post belongs to User
Post.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'author'
});

// Model hooks and methods
console.log('🪝 [models] Setting up model hooks...');

// User hooks
User.beforeCreate(async (user) => {
    console.log(`📝 [models] Creating user: ${user.email}`);
    // Aquí podrías agregar hash de password con bcrypt
    user.email = user.email.toLowerCase().trim();
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        console.log(`🔒 [models] Password updated for user: ${user.email}`);
        // Aquí podrías agregar hash de password con bcrypt
    }
    if (user.changed('email')) {
        user.email = user.email.toLowerCase().trim();
    }
});

User.afterCreate(async (user) => {
    console.log(`✅ [models] User created successfully: ${user.email} (ID: ${user.id})`);
});

// Post hooks
Post.beforeCreate(async (post) => {
    // Auto-generate slug from title if not provided
    if (!post.slug && post.title) {
        post.slug = post.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 100);
    }
    
    // Set publishedAt if status is published
    if (post.status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
    }
    
    console.log(`📝 [models] Creating post: ${post.title}`);
});

Post.beforeUpdate(async (post) => {
    // Update publishedAt when status changes to published
    if (post.changed('status') && post.status === 'published' && !post.publishedAt) {
        post.publishedAt = new Date();
        console.log(`📅 [models] Post published: ${post.title}`);
    }
    
    // Clear publishedAt if status changes from published
    if (post.changed('status') && post.status !== 'published' && post.publishedAt) {
        post.publishedAt = null;
        console.log(`📅 [models] Post unpublished: ${post.title}`);
    }
});

Post.afterCreate(async (post) => {
    console.log(`✅ [models] Post created successfully: ${post.title} (ID: ${post.id})`);
});

// Instance methods
User.prototype.toSafeJSON = function() {
    const { password, ...safeUser } = this.toJSON();
    return safeUser;
};

Post.prototype.incrementViews = function() {
    return this.increment('viewCount');
};

// Class methods
User.findByEmail = function(email) {
    return this.findOne({ where: { email: email.toLowerCase() } });
};

Post.findPublished = function() {
    return this.findAll({ 
        where: { status: 'published' },
        order: [['publishedAt', 'DESC']]
    });
};

// Log successful model registration
const modelNames = Object.keys(sequelize.models);
console.log('✅ [models] Models registered successfully:', modelNames);
console.log('📊 [models] Total models:', modelNames.length);

// Validate associations
console.log('🔗 [models] User associations:', Object.keys(User.associations));
console.log('🔗 [models] Post associations:', Object.keys(Post.associations));

// Log model statistics
console.log('📊 [models] Model statistics:');
console.log(`   - User attributes: ${Object.keys(User.rawAttributes).length}`);
console.log(`   - Post attributes: ${Object.keys(Post.rawAttributes).length}`);

module.exports = {
    User,
    Post,
    sequelize
};