module.exports = function(grunt) {
    // Load libraries
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-exec');

    // Define library tasks
    grunt.initConfig({
        clean: {
            // Remove contents of dist folder
            dist: {
                src: 'dist/*'
            }
        },
        copy: {
            // Copy VCK customizations to the Bootstrap folder
            customizations: {
                expand: true,
                cwd: 'customizations',
                src: '**',
                dest: 'bootstrap/scss/vck'
            },
            // Copy Bootstrap dist folder to our dist folder
            dist: {
                expand: true,
                cwd: 'bootstrap/dist',
                src: '**',
                dest: 'dist'
            }
        },
        file_append: {
            // Append VCK import to Bootstrap
            customizations: {
                files: [
                    {
                        append: '@import "vck/index";',
                        input: 'bootstrap/scss/bootstrap.scss',
                        output: 'bootstrap/scss/bootstrap.scss'
                    }
                ]
            }
        },
        exec: {
            // Rset and update all submodules
            update: {
                cmd: 'git submodule deinit -f . && git submodule update --remote --init'
            },
            // Install Bootstrap
            install: {
                cwd: 'bootstrap',
                cmd: 'yarn install'
            },
            // Run Bootstrap build script
            build: {
                cwd: 'bootstrap',
                cmd: 'grunt dist'
            },
            // Reset all submodules
            clean: {
                cmd: 'git submodule deinit -f . && git submodule update --init'
            }
        }
    });

    // Register default task
    grunt.registerTask('default', ['clean:dist', 'exec:update', 'exec:install', 'copy:customizations', 'file_append', 'exec:build', 'copy:dist', 'exec:clean']);
};
