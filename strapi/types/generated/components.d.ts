import type { Schema, Struct } from '@strapi/strapi';

export interface Container2X2 extends Struct.ComponentSchema {
  collectionName: 'components_container_2x2s';
  info: {
    displayName: '2x2';
    icon: 'dashboard';
  };
  attributes: {
    cubes: Schema.Attribute.Component<'content.cube', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContainerBento extends Struct.ComponentSchema {
  collectionName: 'components_container_bentos';
  info: {
    displayName: 'Bento';
    icon: 'dashboard';
  };
  attributes: {
    cubes: Schema.Attribute.Component<'content.cube', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentCharacterSheet extends Struct.ComponentSchema {
  collectionName: 'components_content_character_sheets';
  info: {
    description: 'The CHARACTER_SHEET window in the home hero';
    displayName: 'Character Sheet';
    icon: 'user';
  };
  attributes: {
    characterClass: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'GAME DEV'>;
    inventoryLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'INVENTORY'>;
    level: Schema.Attribute.String & Schema.Attribute.DefaultTo<'\u221E'>;
    portfolioLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PORTFOLIO'>;
    resumeLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'RESUME'>;
    skills: Schema.Attribute.Component<'content.stat-bar', true>;
    stats: Schema.Attribute.Component<'content.stat-bar', true>;
    status: Schema.Attribute.String & Schema.Attribute.DefaultTo<'SAVE OK'>;
    windowTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CHARACTER_SHEET'>;
  };
}

export interface ContentCube extends Struct.ComponentSchema {
  collectionName: 'components_content_cubes';
  info: {
    displayName: 'Cube';
    icon: 'dashboard';
  };
  attributes: {
    externalLink: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
  };
}

export interface ContentGameShowcase extends Struct.ComponentSchema {
  collectionName: 'components_content_game_showcases';
  info: {
    description: 'The Select Game section on the home page';
    displayName: 'Game Showcase';
    icon: 'play';
  };
  attributes: {
    featured: Schema.Attribute.Component<'content.game-slot', false>;
    fillWithPlaceholders: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    games: Schema.Attribute.Component<'content.game-slot', true>;
    heading: Schema.Attribute.Component<'content.title', false>;
    hint: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u25C0 \u25B6 BROWSE \u00B7 ENTER TO PLAY'>;
  };
}

export interface ContentGameSlot extends Struct.ComponentSchema {
  collectionName: 'components_content_game_slots';
  info: {
    description: 'One slot in the Select Game grid. Leave page and image empty for a placeholder.';
    displayName: 'Game Slot';
    icon: 'puzzle';
  };
  attributes: {
    externalLink: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    placeholderLabel: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContentHeader extends Struct.ComponentSchema {
  collectionName: 'components_content_headers';
  info: {
    displayName: 'Header';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.Text;
    projectLink: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentIcon extends Struct.ComponentSchema {
  collectionName: 'components_content_icons';
  info: {
    displayName: 'Icon';
    icon: 'landscape';
  };
  attributes: {
    key: Schema.Attribute.Enumeration<
      [
        'arduino',
        'aseprite',
        'astro',
        'audacity',
        'aws',
        'blender',
        'django',
        'figma',
        'flutter',
        'godot',
        'maya',
        'next',
        'pocketbase',
        'postgres',
        'redis',
        'sveltekit',
        'tailwind',
        'unreal',
        'strapi',
        'nuxt',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ContentImage extends Struct.ComponentSchema {
  collectionName: 'components_content_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_image_blocks';
  info: {
    displayName: 'Image Block';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentKeywords extends Struct.ComponentSchema {
  collectionName: 'components_content_keywords';
  info: {
    displayName: 'Keywords';
    icon: 'quote';
  };
  attributes: {
    keyword: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentStatBar extends Struct.ComponentSchema {
  collectionName: 'components_content_stat_bars';
  info: {
    description: 'Loading-bar style stat (0-100) with an optional icon';
    displayName: 'Stat Bar';
    icon: 'chartBubble';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['accent', 'red']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'accent'>;
    customIcon: Schema.Attribute.Media<'images'>;
    icon: Schema.Attribute.Enumeration<
      [
        'arduino',
        'aseprite',
        'astro',
        'audacity',
        'aws',
        'blender',
        'django',
        'figma',
        'flutter',
        'godot',
        'maya',
        'next',
        'pocketbase',
        'postgres',
        'redis',
        'sveltekit',
        'tailwind',
        'unreal',
        'strapi',
        'nuxt',
      ]
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
  };
}

export interface ContentTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_text_blocks';
  info: {
    displayName: 'Text Block';
    icon: 'feather';
  };
  attributes: {
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface ContentTitle extends Struct.ComponentSchema {
  collectionName: 'components_content_titles';
  info: {
    description: 'Section heading with an optional subtitle (rendered as a small HUD label above the title)';
    displayName: 'Title';
    icon: 'bold';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_content_video_embeds';
  info: {
    displayName: 'Video Embed';
    icon: 'play';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'container.2x2': Container2X2;
      'container.bento': ContainerBento;
      'content.character-sheet': ContentCharacterSheet;
      'content.cube': ContentCube;
      'content.game-showcase': ContentGameShowcase;
      'content.game-slot': ContentGameSlot;
      'content.header': ContentHeader;
      'content.icon': ContentIcon;
      'content.image': ContentImage;
      'content.image-block': ContentImageBlock;
      'content.keywords': ContentKeywords;
      'content.stat-bar': ContentStatBar;
      'content.text-block': ContentTextBlock;
      'content.title': ContentTitle;
      'content.video-embed': ContentVideoEmbed;
    }
  }
}
