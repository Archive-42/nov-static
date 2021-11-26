'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Stories', [
      {
        title: "The Little Brown Bear",
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit dignissim sodales ut eu. Erat nam at lectus urna duis convallis convallis tellus. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Tellus rutrum tellus pellentesque eu. Justo eget magna fermentum iaculis eu non diam. Lectus proin nibh nisl condimentum. Ornare arcu dui vivamus arcu felis. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Donec massa sapien faucibus et molestie. Risus in hendrerit gravida rutrum quisque. Imperdiet nulla malesuada pellentesque elit eget gravida. Elit eget gravida cum sociis natoque penatibus et magnis. Vitae auctor eu augue ut lectus arcu. Placerat orci nulla pellentesque dignissim enim sit amet. Neque egestas congue quisque egestas diam in arcu cursus euismod.

        Etiam erat velit scelerisque in dictum non. Euismod nisi porta lorem mollis. Nisi est sit amet facilisis magna etiam tempor orci eu. Morbi quis commodo odio aenean sed adipiscing. Sed lectus vestibulum mattis ullamcorper velit. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Velit scelerisque in dictum non consectetur a. Facilisi cras fermentum odio eu feugiat pretium. In aliquam sem fringilla ut. Lectus quam id leo in vitae turpis massa sed. Sit amet nisl purus in. Dui ut ornare lectus sit amet est. Nunc mi ipsum faucibus vitae aliquet nec. Convallis convallis tellus id interdum velit. Justo eget magna fermentum iaculis eu non. Erat pellentesque adipiscing commodo elit at. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lectus sit amet est placerat in. Sit amet massa vitae tortor condimentum lacinia quis vel.

        Diam vel quam elementum pulvinar. In hendrerit gravida rutrum quisque. Sit amet nisl suscipit adipiscing. Neque viverra justo nec ultrices dui sapien eget mi proin. Tincidunt id aliquet risus feugiat in ante metus dictum at. Augue lacus viverra vitae congue eu consequat ac felis donec. Id faucibus nisl tincidunt eget nullam non. Velit egestas dui id ornare arcu. Vulputate dignissim suspendisse in est ante. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Leo a diam sollicitudin tempor. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Consequat nisl vel pretium lectus quam id leo in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Iaculis eu non diam phasellus vestibulum lorem sed risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Leo duis ut diam quam nulla porttitor massa.
        `,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Large Brown Bear",
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit dignissim sodales ut eu. Erat nam at lectus urna duis convallis convallis tellus. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Tellus rutrum tellus pellentesque eu. Justo eget magna fermentum iaculis eu non diam. Lectus proin nibh nisl condimentum. Ornare arcu dui vivamus arcu felis. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Donec massa sapien faucibus et molestie. Risus in hendrerit gravida rutrum quisque. Imperdiet nulla malesuada pellentesque elit eget gravida. Elit eget gravida cum sociis natoque penatibus et magnis. Vitae auctor eu augue ut lectus arcu. Placerat orci nulla pellentesque dignissim enim sit amet. Neque egestas congue quisque egestas diam in arcu cursus euismod.

        Etiam erat velit scelerisque in dictum non. Euismod nisi porta lorem mollis. Nisi est sit amet facilisis magna etiam tempor orci eu. Morbi quis commodo odio aenean sed adipiscing. Sed lectus vestibulum mattis ullamcorper velit. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Velit scelerisque in dictum non consectetur a. Facilisi cras fermentum odio eu feugiat pretium. In aliquam sem fringilla ut. Lectus quam id leo in vitae turpis massa sed. Sit amet nisl purus in. Dui ut ornare lectus sit amet est. Nunc mi ipsum faucibus vitae aliquet nec. Convallis convallis tellus id interdum velit. Justo eget magna fermentum iaculis eu non. Erat pellentesque adipiscing commodo elit at. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lectus sit amet est placerat in. Sit amet massa vitae tortor condimentum lacinia quis vel.

        Diam vel quam elementum pulvinar. In hendrerit gravida rutrum quisque. Sit amet nisl suscipit adipiscing. Neque viverra justo nec ultrices dui sapien eget mi proin. Tincidunt id aliquet risus feugiat in ante metus dictum at. Augue lacus viverra vitae congue eu consequat ac felis donec. Id faucibus nisl tincidunt eget nullam non. Velit egestas dui id ornare arcu. Vulputate dignissim suspendisse in est ante. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Leo a diam sollicitudin tempor. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Consequat nisl vel pretium lectus quam id leo in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Iaculis eu non diam phasellus vestibulum lorem sed risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Leo duis ut diam quam nulla porttitor massa.
        `,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Little Polar Bear",
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit dignissim sodales ut eu. Erat nam at lectus urna duis convallis convallis tellus. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Tellus rutrum tellus pellentesque eu. Justo eget magna fermentum iaculis eu non diam. Lectus proin nibh nisl condimentum. Ornare arcu dui vivamus arcu felis. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Donec massa sapien faucibus et molestie. Risus in hendrerit gravida rutrum quisque. Imperdiet nulla malesuada pellentesque elit eget gravida. Elit eget gravida cum sociis natoque penatibus et magnis. Vitae auctor eu augue ut lectus arcu. Placerat orci nulla pellentesque dignissim enim sit amet. Neque egestas congue quisque egestas diam in arcu cursus euismod.

        Etiam erat velit scelerisque in dictum non. Euismod nisi porta lorem mollis. Nisi est sit amet facilisis magna etiam tempor orci eu. Morbi quis commodo odio aenean sed adipiscing. Sed lectus vestibulum mattis ullamcorper velit. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Velit scelerisque in dictum non consectetur a. Facilisi cras fermentum odio eu feugiat pretium. In aliquam sem fringilla ut. Lectus quam id leo in vitae turpis massa sed. Sit amet nisl purus in. Dui ut ornare lectus sit amet est. Nunc mi ipsum faucibus vitae aliquet nec. Convallis convallis tellus id interdum velit. Justo eget magna fermentum iaculis eu non. Erat pellentesque adipiscing commodo elit at. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lectus sit amet est placerat in. Sit amet massa vitae tortor condimentum lacinia quis vel.

        Diam vel quam elementum pulvinar. In hendrerit gravida rutrum quisque. Sit amet nisl suscipit adipiscing. Neque viverra justo nec ultrices dui sapien eget mi proin. Tincidunt id aliquet risus feugiat in ante metus dictum at. Augue lacus viverra vitae congue eu consequat ac felis donec. Id faucibus nisl tincidunt eget nullam non. Velit egestas dui id ornare arcu. Vulputate dignissim suspendisse in est ante. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Leo a diam sollicitudin tempor. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Consequat nisl vel pretium lectus quam id leo in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Iaculis eu non diam phasellus vestibulum lorem sed risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Leo duis ut diam quam nulla porttitor massa.
        `,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Large Polar Bear",
        body: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit dignissim sodales ut eu. Erat nam at lectus urna duis convallis convallis tellus. Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Tellus rutrum tellus pellentesque eu. Justo eget magna fermentum iaculis eu non diam. Lectus proin nibh nisl condimentum. Ornare arcu dui vivamus arcu felis. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Donec massa sapien faucibus et molestie. Risus in hendrerit gravida rutrum quisque. Imperdiet nulla malesuada pellentesque elit eget gravida. Elit eget gravida cum sociis natoque penatibus et magnis. Vitae auctor eu augue ut lectus arcu. Placerat orci nulla pellentesque dignissim enim sit amet. Neque egestas congue quisque egestas diam in arcu cursus euismod.

        Etiam erat velit scelerisque in dictum non. Euismod nisi porta lorem mollis. Nisi est sit amet facilisis magna etiam tempor orci eu. Morbi quis commodo odio aenean sed adipiscing. Sed lectus vestibulum mattis ullamcorper velit. Mauris ultrices eros in cursus turpis massa tincidunt dui ut. Velit scelerisque in dictum non consectetur a. Facilisi cras fermentum odio eu feugiat pretium. In aliquam sem fringilla ut. Lectus quam id leo in vitae turpis massa sed. Sit amet nisl purus in. Dui ut ornare lectus sit amet est. Nunc mi ipsum faucibus vitae aliquet nec. Convallis convallis tellus id interdum velit. Justo eget magna fermentum iaculis eu non. Erat pellentesque adipiscing commodo elit at. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lectus sit amet est placerat in. Sit amet massa vitae tortor condimentum lacinia quis vel.

        Diam vel quam elementum pulvinar. In hendrerit gravida rutrum quisque. Sit amet nisl suscipit adipiscing. Neque viverra justo nec ultrices dui sapien eget mi proin. Tincidunt id aliquet risus feugiat in ante metus dictum at. Augue lacus viverra vitae congue eu consequat ac felis donec. Id faucibus nisl tincidunt eget nullam non. Velit egestas dui id ornare arcu. Vulputate dignissim suspendisse in est ante. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Leo a diam sollicitudin tempor. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Consequat nisl vel pretium lectus quam id leo in. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Iaculis eu non diam phasellus vestibulum lorem sed risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Leo duis ut diam quam nulla porttitor massa.
        `,
        authorId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Stories', null, {});

  }
};
