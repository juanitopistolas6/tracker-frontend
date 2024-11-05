import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslintParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
	// Definimos los archivos a los que aplicará ESLint
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			// Configurar el analizador de TypeScript para los archivos TS
			parser: tsEslintParser,
			globals: globals.browser,
		},
	},

	// Configuración recomendada para JavaScript
	pluginJs.configs.recommended,

	// Configuración de React en formato "flat"
	pluginReact.configs.flat.recommended,

	// Configuración personalizada con Prettier y reglas específicas
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					semi: false, // No usar punto y coma
					endOfLine: 'auto', // Final de línea automático
				},
			],
			'react/react-in-jsx-scope': 'off', // Desactivar la regla de React en JSX
			'no-unused-vars': [
				'warn',
				{ vars: 'all', args: 'none', ignoreRestSiblings: true },
			],
			...configPrettier.rules, // Incluir las reglas de Prettier
		},
	},
]
