"""
Unit & Integration tests for Multi-Agent Content Ingestion Orchestrator.
Tests Agents 1, 2, 3, 4, and 5 in isolated temporary directories.

Updated to ensure .docx files are preserved natively as .docx without conversion.
"""

import unittest
import tempfile
import shutil
import json
from pathlib import Path
from docx import Document
from PIL import Image
import io

from orchestrator.agent1_convert import Agent1NormalizeConvert, ConversionError
from orchestrator.agent2_placement import Agent2Placement
from orchestrator.agent3_numbering import Agent3NumberingDedup
from orchestrator.agent4_validation import Agent4Validation
from orchestrator.agent5_git import Agent5GitPush
from orchestrator.config import DAYS_DIR, LABS_DIR


class TestAgent3Numbering(unittest.TestCase):
    def test_propose_next_day_number(self):
        next_day = Agent3NumberingDedup.propose_next_day_number()
        self.assertGreaterEqual(next_day, 2, "Proposed day number should be at least 2")

    def test_scan_existing_days(self):
        days = Agent3NumberingDedup.scan_existing_days()
        self.assertIn(1, days, "Day 1 should be detected in content/days/")

    def test_scan_existing_labs(self):
        labs = Agent3NumberingDedup.scan_existing_labs("azure-portal")
        self.assertIn(1, labs)
        self.assertIn(7, labs)
        next_lab = Agent3NumberingDedup.propose_next_lab_number("azure-portal")
        self.assertEqual(next_lab, 8)


class TestAgent1Convert(unittest.TestCase):
    def setUp(self):
        self.test_dir = Path(tempfile.mkdtemp(prefix="test_agent1_"))
        self.agent = Agent1NormalizeConvert(run_id="test_run")

    def tearDown(self):
        self.agent.cleanup_staging()
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_preserve_docx_native(self):
        """Test that docx files are preserved natively as .docx."""
        docx_path = self.test_dir / "sample.docx"
        doc = Document()
        doc.add_heading("MLOps Pipelines Overview", level=1)
        doc.add_paragraph("Important concept: Automated deployment")
        doc.save(str(docx_path))
        orig_mtime = docx_path.stat().st_mtime

        # Run process_file — should preserve .docx
        staged_file = self.agent.process_file(docx_path, "transcript-1.docx")

        self.assertTrue(staged_file.exists())
        self.assertEqual(staged_file.suffix, ".docx")

        # Verify it can be read as a valid docx
        read_doc = Document(str(staged_file))
        self.assertEqual(read_doc.paragraphs[0].text, "MLOps Pipelines Overview")

        # Verify original file was not mutated
        self.assertEqual(docx_path.stat().st_mtime, orig_mtime)

    def test_process_markdown_and_text(self):
        """Test that .md/.txt files pass through cleaned."""
        md_path = self.test_dir / "raw_notes.md"
        md_path.write_text("# Raw Notes\r\n\r\n- Item 1\r\n", encoding="utf-8")

        staged_file = self.agent.process_file(md_path, "summary.md")
        self.assertTrue(staged_file.exists())
        self.assertEqual(staged_file.suffix, ".md")
        self.assertEqual(staged_file.read_text(encoding="utf-8"), "# Raw Notes\n\n- Item 1\n")

    def test_process_image(self):
        img_path = self.test_dir / "test_doodle.png"
        img = Image.new("RGB", (64, 64), color="blue")
        img.save(str(img_path))

        staged = self.agent.process_file(img_path, "doodle.png")
        self.assertTrue(staged.exists())
        self.assertEqual(staged.suffix, ".png")


class TestAgent2Placement(unittest.TestCase):
    def setUp(self):
        self.temp_root = Path(tempfile.mkdtemp(prefix="test_agent2_"))
        self.agent = Agent2Placement()

    def tearDown(self):
        shutil.rmtree(self.temp_root, ignore_errors=True)

    def test_ensure_day_metadata(self):
        meta_file = self.agent.ensure_day_metadata(
            day_number=99,
            title="Day 99",
            subtitle="Unit Test Day",
            description="Testing metadata placement",
        )
        self.assertTrue(meta_file.exists())
        data = json.loads(meta_file.read_text(encoding="utf-8"))
        self.assertEqual(data["day"], 99)
        self.assertEqual(data["title"], "Day 99")
        self.assertEqual(data["subtitle"], "Unit Test Day")

        # Cleanup test day 99
        day99_dir = DAYS_DIR / "day-99"
        if day99_dir.exists():
            shutil.rmtree(day99_dir, ignore_errors=True)

    def test_ensure_lab_metadata(self):
        meta_file = self.agent.ensure_lab_metadata(
            platform="azure-portal",
            lab_number=99,
            lab_id="99-unit-test-lab",
            title="Unit Test Lab",
            source_url="https://example.com/lab99",
        )
        self.assertTrue(meta_file.exists())
        data = json.loads(meta_file.read_text(encoding="utf-8"))
        self.assertEqual(data["number"], 99)
        self.assertEqual(data["id"], "99-unit-test-lab")

        # Cleanup test lab 99
        lab99_dir = LABS_DIR / "azure-portal" / "99-unit-test-lab"
        if lab99_dir.exists():
            shutil.rmtree(lab99_dir, ignore_errors=True)


class TestAgent4Validation(unittest.TestCase):
    def setUp(self):
        self.test_dir = Path(tempfile.mkdtemp(prefix="test_agent4_"))
        self.agent = Agent4Validation()

    def tearDown(self):
        shutil.rmtree(self.test_dir, ignore_errors=True)

    def test_validation_docx_pass(self):
        """Test that valid .docx files pass validation."""
        f1 = self.test_dir / "transcript-1.docx"
        doc = Document()
        doc.add_paragraph("Sample transcript paragraph")
        doc.save(str(f1))

        res = self.agent.validate_plan([f1])
        self.assertTrue(res.all_passed)
        self.assertEqual(res.passed_count, 1)

    def test_validation_pass(self):
        f1 = self.test_dir / "meta.json"
        f1.write_text(json.dumps({"day": 1, "title": "Day 1"}), encoding="utf-8")
        f2 = self.test_dir / "summary.md"
        f2.write_text("# Summary\nContent here.", encoding="utf-8")

        res = self.agent.validate_plan([f1, f2])
        self.assertTrue(res.all_passed)
        self.assertEqual(res.passed_count, 2)

    def test_validation_fail_empty_file(self):
        f1 = self.test_dir / "empty.md"
        f1.write_text("", encoding="utf-8")

        res = self.agent.validate_plan([f1])
        self.assertFalse(res.all_passed)
        self.assertEqual(res.failed_count, 1)

    def test_validation_fail_invalid_json(self):
        f1 = self.test_dir / "meta.json"
        f1.write_text("{ broken json: ", encoding="utf-8")

        res = self.agent.validate_plan([f1])
        self.assertFalse(res.all_passed)


class TestEndToEndOrchestration(unittest.TestCase):
    def setUp(self):
        self.raw_dir = Path(tempfile.mkdtemp(prefix="test_e2e_raw_"))
        self.test_day = 98
        self.day_dir = DAYS_DIR / f"day-{self.test_day:02d}"

    def tearDown(self):
        shutil.rmtree(self.raw_dir, ignore_errors=True)
        if self.day_dir.exists():
            shutil.rmtree(self.day_dir, ignore_errors=True)

    def test_full_pipeline_day_ingestion(self):
        agent1 = Agent1NormalizeConvert(run_id="e2e_test")
        agent2 = Agent2Placement()
        agent3 = Agent3NumberingDedup()
        agent4 = Agent4Validation()
        agent5 = Agent5GitPush()

        try:
            # 1. Prepare raw inputs (docx transcript, docx summary)
            raw_transcript = self.raw_dir / "raw_session1.docx"
            doc1 = Document()
            doc1.add_heading("Session 1: Production Machine Learning", level=1)
            doc1.add_paragraph("This session covers monitoring, drift detection, and automated retraining.")
            doc1.save(str(raw_transcript))

            raw_summary = self.raw_dir / "raw_summary.docx"
            doc2 = Document()
            doc2.add_heading("Day 98 Executive Summary", level=1)
            doc2.add_paragraph("Key takeaways from today's discussion on scalable pipelines.")
            doc2.save(str(raw_summary))

            # 2. Agent 1: Normalize & Stage — preserves .docx natively
            staged_t1 = agent1.process_file(raw_transcript, "transcript-1.docx")
            staged_sum = agent1.process_file(raw_summary, "summary.docx")

            self.assertEqual(staged_t1.suffix, ".docx")
            self.assertEqual(staged_sum.suffix, ".docx")

            # 3. Agent 2: Placement
            placed_t1 = agent2.place_day_file(staged_t1, self.test_day, "transcript", transcript_index=1)
            placed_sum = agent2.place_day_file(staged_sum, self.test_day, "summary")
            placed_meta = agent2.ensure_day_metadata(
                day_number=self.test_day,
                title=f"Day {self.test_day}",
                subtitle="Production MLOps Deployment",
                description="Testing full multi-agent pipeline.",
            )
            placed_links = agent2.ensure_day_links(
                self.test_day,
                [{"label": "Azure ML Docs", "url": "https://learn.microsoft.com/azure/machine-learning", "description": "Docs"}],
            )

            expected_files = [placed_t1, placed_sum, placed_meta, placed_links]

            # 4. Agent 4: Validation
            validation = agent4.validate_plan(expected_files, day_number=self.test_day)
            self.assertTrue(validation.all_passed, "All Agent 4 validation checks must pass")
            self.assertEqual(validation.failed_count, 0)

            # 5. Agent 5: Check selective touched files
            touched = agent2.get_touched_files()
            self.assertEqual(len(touched), 4)
            for f in expected_files:
                self.assertIn(f, touched)

            # 6. Verify filesystem layout has native .docx files
            self.assertTrue((self.day_dir / "meta.json").exists())
            self.assertTrue((self.day_dir / "summary.docx").exists())
            self.assertTrue((self.day_dir / "links.json").exists())
            self.assertTrue((self.day_dir / "transcripts" / "transcript-1.docx").exists())

        finally:
            agent1.cleanup_staging()


if __name__ == "__main__":
    unittest.main()
