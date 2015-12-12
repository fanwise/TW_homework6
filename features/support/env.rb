require 'capybara'
require 'capybara/cucumber'
require 'rspec'
require 'pry'
# require 'site_prism'

# require 'require_all'
# require_all 'lib'


Capybara.register_driver :selenium do |app|
	options = {
		browser: :firefox
	}
  Capybara::Selenium::Driver.new(app, options)
end

Capybara.default_driver = :selenium
Capybara.app_host = 'http://127.0.0.1/TW_homework6'