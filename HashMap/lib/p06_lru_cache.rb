require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  attr_reader :count
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

  # get will update or add new link and store it under map[key]
  def get(key)
    link = @map[key]
    if link
      @store.append(link.key, link.val)
      link.remove
      link.val
    else
      val = @prc.call(key)
      new_link = @store.append(key, val)
      @map[key] = new_link

      eject! if count > @max
      val
    end
  end

  def to_s
    "Map: " + @map.to_s + "\n" + "Store: " + @store.to_s
  end

  private

  def calc!(key)
  end

  def update_link!(link)
  end

  # remove both the link and the reference from the hashmap
  def eject!
    rm_link = @store.first
    rm_link.remove
    @map.delete(rm_link.key)
    nil
  end
end
