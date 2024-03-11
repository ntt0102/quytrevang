<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertFalse(false);
    }

    public function test_equal()
    {
        $expected = "Hoang";
        $actual = "Hoang";

        $this->assertEquals(
            $expected,
            $actual,
            "actual value is not equals to expected"
        );
    }
}
