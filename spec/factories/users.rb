FactoryGirl.define do
  factory :user do
    sequence :email do |n|
      "person#{n}@example.com"
    end

    sequence :full_name do |n|
      "username#{n}"
    end

    password "123456"
  end
end
