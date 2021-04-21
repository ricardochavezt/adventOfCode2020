fun findBus(earliestTimestamp: Int, busIds: List<Int>) {
    var minDifference = Int.MAX_VALUE
    var foundBusId = 0
    for (id in busIds) {
        val diff = ((earliestTimestamp / id) + 1) * id - earliestTimestamp
        if (diff < minDifference) {
            minDifference = diff
            foundBusId = id
        }
    }
    println("Found bus $foundBusId, difference $minDifference = ${foundBusId * minDifference}")
}

fun main() {
    val earliestTimestamp = readLine()!!.toInt()
    val busIds = readLine()!!.split(",").filter {s -> s != "x"}.map {s -> s.toInt()}

    println("Earliest timestamp: $earliestTimestamp, bus IDs: $busIds")

    findBus(earliestTimestamp, busIds)
}
