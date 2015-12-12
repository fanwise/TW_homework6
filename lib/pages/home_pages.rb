class HomePage < SitePrism::Page
	set_url "/"

	element :keyword, '.search'
	elements :results, '.res li'

	
