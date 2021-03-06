module.exports = {
	options: {
		livereload: true
	},
	configFiles: {
		files: ['Gruntfile.js', 'grunt/*.js'],
		options: {
			livereload: false,
			reload: true
		}
	},
	sass: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/styles/**/*.scss'],
		tasks: ['sass:development', 'postcss:development']
	},
	styles: {
		files: ['<%= compiledLocation %>/styles/**/*.css'],
		tasks: []
	},
	templates: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/templates/**/*'],
		tasks: ['newer:copy:development']
	},
	assets: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/styles/assets/**/*'],
		tasks: ['newer:copy:development']
	},
	external: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/external/**/*'],
		tasks: ['newer:copy:development']
	},
	typescript: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/**/*.ts'],
		tasks: ['tslint']
	},
	index: {
		options: {
			livereload: false
		},
		files: ['<%= srcLocation %>/index.html'],
		tasks: ['htmlbuild:development']
	}
};
