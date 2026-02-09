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
      'content.cube': ContentCube;
      'content.header': ContentHeader;
      'content.icon': ContentIcon;
      'content.image': ContentImage;
      'content.image-block': ContentImageBlock;
      'content.keywords': ContentKeywords;
      'content.text-block': ContentTextBlock;
      'content.video-embed': ContentVideoEmbed;
    }
  }
}
