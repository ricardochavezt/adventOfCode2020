input = ARGF.read

def correct_password?(n1, n2, required_char, password)
    count = password.each_char.count {|c| c == required_char}
    return count >= n1 && count <= n2
end

def correct_password_2?(n1, n2, required_char, password)
    position1_valid = password[n1-1] == required_char
    position2_valid = password[n2-1] == required_char
    return (position1_valid || position2_valid) && !(position1_valid && position2_valid)
end

num_correct_passwords = 0
input.each_line do |line|
    fields = line.match(/(\d+)-(\d+) (\w)\: (.*)/)
    min_chars = fields[1].to_i
    max_chars = fields[2].to_i
    required_char = fields[3]
    password = fields[4]

    num_correct_passwords += 1 if correct_password_2?(min_chars, max_chars, required_char, password)
end

puts "#{num_correct_passwords} passwords correctos"