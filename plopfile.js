module.exports = function (plop) {
    plop.setGenerator('component', {
      description: 'Gerar um novo componente',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Qual é o nome do componente?'
        }
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/index.js',
          templateFile: 'plop-templates/component/index.js.hbs'
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile: 'plop-templates/component/component.js.hbs'
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/styles.js',
          templateFile: 'plop-templates/component/styles.js.hbs'
        }
      ]
    });
  };
  