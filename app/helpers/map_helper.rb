module MapHelper

  def p(latlng)
    temp = latlng.split(',')
    "#{temp[1]},#{temp[0]},0"
  end

  def p_multi(data)
    temp = data.split('|')
    result = ''
    temp.each do |t|
      result += "\n#{p(t)}"
    end
    "#{result}\n"
  end

end
