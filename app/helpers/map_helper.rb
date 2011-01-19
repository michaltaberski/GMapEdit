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

  def get_surface(data)
    latitiude = []
    longitude = []
    data.split('|').each do |e|
      lat, lng = e.split(',')
      latitiude.push(lat.to_f)
      longitude.push(lng.to_f)
    end

    earth_radius = 6371009 # srednica ziemi w metrach
    lat_dist = Math::PI * earth_radius / 180.0
    y = latitiude.map{|l| l * lat_dist}
    x = longitude.map.with_index{|l,i| l * lat_dist * Math.cos(latitiude[i]*Math::PI/180)}
    area = 0.0
    for i in -1..(x.count-2)
      area += x[i] * (y[i+1] - y[i-1])
    end
    (area/2.0).abs    
  end

end
