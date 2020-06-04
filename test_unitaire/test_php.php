<?php
use PHPUnit\Framework\TestCase;
require_once dirname(dirname(__FILE__))."/modele/Code_PIN.php";

class test_php extends TestCase
{
    public function test_true_if_false()
    {
        $this->assertTrue(false);
    }
    public function test_true_if_true()
    {
        $this->assertTrue(true);
    }

    public function  test_false_if_false()
    {
        $this->assertFalse(false);
    }

    public function test_false_if_true()
    {
        $this->assertFalse(true);
    }
}