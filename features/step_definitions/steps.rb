Given(/^Open the homepage$/) do
  visit '/'
  sleep 1
end

Given(/^Search "([^"]*)"$/) do | search_content |
  fill_in 'search', with: search_content
  sleep 1
end

Given(/^Have (\d+) result$/) do | expect | 
  sleep 1
  result = all('.res li')
  sleep 1
  expect(result.length).to eq expect.to_i
end

Given(/^Add "([^"]*)" "([^"]*)"$/) do |title, address|
  find("#popadd").click
  fill_in "title_input", with: title
  fill_in "address_input", with: address
  sleep 1
  find("#add_yes").click
  sleep 1
end

Given(/^Delete (\d+) in list$/) do | index | 
  find("#b"+index).click
  find("#delete_yes").click
end

