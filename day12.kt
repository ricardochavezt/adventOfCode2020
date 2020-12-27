import kotlin.math.abs

data class Instruction(val action: String, val value: Int)

enum class Direction {
    NORTH, EAST, SOUTH, WEST
}

data class Point(val x: Int, val y: Int) {
    fun move(distance: Int, direction: Direction): Point {
        return when (direction) {
            Direction.NORTH -> this.copy(y = y + distance)
            Direction.SOUTH -> this.copy(y = y - distance)
            Direction.EAST -> this.copy(x = x + distance)
            Direction.WEST -> this.copy(x = x - distance)
        }
    }

    fun rotateLeftAroundOrigin() = Point(x=-y, y=x)

    fun rotateRightAroundOrigin() = Point(x=y, y=-x)
}

class Ship(var position: Point, var direction: Direction, var waypoint: Point = Point(0,0)) {
    fun move(distance: Int, direction: Direction) {
        position = position.move(distance, direction)
    }

    fun move(distance: Int) = move(distance, this.direction)

    fun moveWaypoint(distance: Int, direction: Direction) {
        waypoint = waypoint.move(distance, direction)
    }

    fun moveTowardsWaypoint(factor: Int) {
        position = Point(x=position.x+waypoint.x*factor, y=position.y+waypoint.y*factor)
    }

    fun rotateLeft() {
        when (this.direction) {
            Direction.NORTH -> direction = Direction.WEST
            Direction.SOUTH -> direction = Direction.EAST
            Direction.EAST -> direction = Direction.NORTH
            Direction.WEST -> direction = Direction.SOUTH
        }
    }

    fun rotateRight() {
        when (this.direction) {
            Direction.NORTH -> direction = Direction.EAST
            Direction.SOUTH -> direction = Direction.WEST
            Direction.EAST -> direction = Direction.SOUTH
            Direction.WEST -> direction = Direction.NORTH
        }
    }

    fun rotateWaypointLeft() {
        waypoint = waypoint.rotateLeftAroundOrigin()
    }

    fun rotateWaypointRight() {
        waypoint = waypoint.rotateRightAroundOrigin()
    }
}

fun part1(instructions: List<Instruction>, ship: Ship) {
    for (instruction in instructions) {
        when (instruction.action) {
            "N" -> ship.move(instruction.value, Direction.NORTH)
            "S" -> ship.move(instruction.value, Direction.SOUTH)
            "E" -> ship.move(instruction.value, Direction.EAST)
            "W" -> ship.move(instruction.value, Direction.WEST)
            "F" -> ship.move(instruction.value)
            "L" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateLeft()
            }
            "R" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateRight()
            }
        }
    }
    println("Part 1: Final Manhattan distance: ${abs(ship.position.x) + abs(ship.position.y)}")
}

fun part2(instructions: List<Instruction>, ship: Ship) {
    for (instruction in instructions) {
        when (instruction.action) {
            "N" -> ship.moveWaypoint(instruction.value, Direction.NORTH)
            "S" -> ship.moveWaypoint(instruction.value, Direction.SOUTH)
            "E" -> ship.moveWaypoint(instruction.value, Direction.EAST)
            "W" -> ship.moveWaypoint(instruction.value, Direction.WEST)
            "F" -> ship.moveTowardsWaypoint(instruction.value)
            "L" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateWaypointLeft()
            }
            "R" -> {
                for (i in 1..(instruction.value / 90)) ship.rotateWaypointRight()
            }
        }
    }
    println("Part 2: Final Manhattan distance: ${abs(ship.position.x) + abs(ship.position.y)}")
}

fun main() {
    val lineRegex = Regex("([A-Z])(\\d+)", RegexOption.IGNORE_CASE)
    val instructions = emptyList<Instruction>().toMutableList()
    do {
        val line = readLine()
        lineRegex.matchEntire(line ?: "")?.let {
            val (action, value) = it.destructured
            instructions.add(Instruction(action, value.toInt()))
        }
    } while (line != null)

    part1(instructions=instructions, ship=Ship(position=Point(x=0, y=0), direction=Direction.EAST))

    part2(instructions=instructions, ship=Ship(position=Point(x=0, y=0), direction=Direction.EAST, waypoint=Point(x=10, y=1)))
}
