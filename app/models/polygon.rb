class Polygon < ActiveRecord::Base

  validates_presence_of :data

  belongs_to :user
  

end
